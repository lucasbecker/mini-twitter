import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = new Router();
const prisma = new PrismaClient();

router.get('/', ctx => {
  ctx.body = 'api from mini-twitter';
})

router.get('/tweets', async ctx => {
  const [, token] = ctx.request.headers?.authorization?.split(' ') || [];

  if (!token) {
    ctx.status = 401;
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    ctx.body = await prisma.tweet.findMany({
      select: {
        id: true,
        text: true,
        user: {
          select: {
            username: true,
            name: true,
          }
        }
      }
    });
  } catch (error) {
    if (typeof error === 'JsonWebTokenError') {
      ctx.status = 401;
      return; 
    }
    ctx.status = 500;
  }
})

router.get('/tweets/:username', async ctx => {
  // ctx.body = tweets.filter(tweet => tweet.username === ctx.params.username);

  const username = ctx.params.username;

  const [, token] = ctx.request.headers?.authorization?.split(' ') || [];

  if (!token) {
    ctx.status = 401;
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    ctx.body = await prisma.tweet.findMany({
      include: {
        user: true,
      },
      where: {
        user: {
          username,
        },
      }
    });
  } catch (error) {
    if (typeof error === 'JsonWebTokenError') {
      ctx.status = 401;
      return; 
    }
    ctx.status = 500;
  }
})

router.post('/tweets', async ctx => {
  const [, token] = ctx.request.headers?.authorization?.split(' ') || [];

  if (!token) {
    ctx.status = 401;
    return;
  }

  try {
    const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { text } = ctx.request.body;
  
    ctx.body = await prisma.tweet.create({
      data: { userId, text },
    });
  } catch (error) {
    ctx.status = 401;
    return
  }
})

router.post('/signup', async ctx => {
  try {
    const password = bcrypt.hashSync(ctx.request.body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: ctx.request.body.name,
        username: ctx.request.body.username,
        email: ctx.request.body.email,
        password,
      },
    });

    const accessToken = jwt.sign({
      sub: user.id
    }, process.env.JWT_SECRET, { expiresIn: '24h' })

    ctx.body = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      accessToken,
    };
  } catch (error) {
    if (error.meta && !error.meta.target) {
      ctx.status = 422;
      ctx.body = "E-mail ou username já cadastrado.";
    } else {
      ctx.status = 500;
      ctx.body = "Ops... Algo inesperado aconteceu.";
    }
  }
});

router.get('/users', async ctx => {
  ctx.body = await prisma.user.findMany();
})

router.get('/login', async ctx => {
  const [, token] = ctx.request.headers.authorization.split(' ');
  const [email, plainTextPassword] = Buffer.from(token, 'base64').toString().split(':');

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    ctx.status = 404;
    ctx.body = "E-mail incorreto!";
    return;
  }

  const passwordMatch = bcrypt.compareSync(plainTextPassword, user.password);
  
  if (!passwordMatch) {
    ctx.status = 404;
    ctx.body = "Senha incorreta!";
    return;
  }

  const accessToken = jwt.sign({
    sub: user.id
  }, process.env.JWT_SECRET, { expiresIn: '24h' })

  ctx.body = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    accessToken,
  };
})

router.get('/authenticate', async ctx => {
  const [, token] = ctx.request.headers.authorization.split(' ');

  if (!token) {
    ctx.status = 401;
    return;
  }

  const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    });

  if (!user) {
    ctx.status = 401;
    return;
  }

  ctx.body = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    accessToken: token,
  };
});

export default router;
