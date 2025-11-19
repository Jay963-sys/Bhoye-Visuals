This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
videographer-portfolio-p
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20250726003636_init
│  │  │  └─ migration.sql
│  │  ├─ 20250726015742_add_orientation
│  │  │  └─ migration.sql
│  │  ├─ 20250726163955_add_public_id
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ audio
│  │  └─ intro-bg.mp3
│  ├─ favico.ico
│  ├─ favicon.ico
│  ├─ me.jpg
│  ├─ og-image.png
│  └─ videos
│     └─ hero-bg.mp4
├─ README.md
├─ src
│  ├─ app
│  │  ├─ about
│  │  │  └─ page.tsx
│  │  ├─ admin
│  │  │  └─ page.tsx
│  │  ├─ api
│  │  │  └─ videos
│  │  │     ├─ route.ts
│  │  │     ├─ stats
│  │  │     │  └─ route.ts
│  │  │     └─ [id]
│  │  │        └─ route.ts
│  │  ├─ contact
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ projects
│  │  │  └─ page.tsx
│  │  └─ sign-in
│  │     └─ [[...sign-in]]
│  │        └─ page.tsx
│  ├─ components
│  │  ├─ AdminStats.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ ProjectCard.tsx
│  │  ├─ UploadForm.tsx
│  │  └─ VideoListAdmin.tsx
│  ├─ data
│  │  └─ mockVideos.ts
│  ├─ db
│  ├─ lib
│  │  ├─ cloudinary.ts
│  │  └─ prisma.ts
│  ├─ middleware.ts
│  └─ utils
│     └─ cloudinary.ts
└─ tsconfig.json

```

```
videographer-portfolio-p
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20250726003636_init
│  │  │  └─ migration.sql
│  │  ├─ 20250726015742_add_orientation
│  │  │  └─ migration.sql
│  │  ├─ 20250726163955_add_public_id
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ audio
│  │  └─ intro-bg.mp3
│  ├─ favico.ico
│  ├─ favicon.ico
│  ├─ grain.png
│  ├─ hero-bg.jpg
│  ├─ Logo Dark.svg
│  ├─ logos
│  │  ├─ gucci.svg
│  │  ├─ max.svg
│  │  ├─ mtvbase.svg
│  │  ├─ northface.svg
│  │  ├─ sony.svg
│  │  ├─ unitednations.svg
│  │  └─ youtube.svg
│  ├─ me.jpg
│  ├─ noise.png
│  ├─ noise.svg
│  ├─ og-image.png
│  ├─ profile.jpg
│  └─ videos
│     └─ hero-bg.mp4
├─ README.md
├─ src
│  ├─ app
│  │  ├─ about
│  │  │  └─ page.tsx
│  │  ├─ admin
│  │  │  └─ page.tsx
│  │  ├─ api
│  │  │  └─ videos
│  │  │     ├─ latest
│  │  │     │  └─ route.ts
│  │  │     ├─ route.ts
│  │  │     ├─ stats
│  │  │     │  └─ route.ts
│  │  │     └─ [id]
│  │  │        └─ route.ts
│  │  ├─ contact
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ projects
│  │  │  └─ page.tsx
│  │  └─ sign-in
│  │     └─ [[...sign-in]]
│  │        └─ page.tsx
│  ├─ components
│  │  ├─ AdminStats.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ ProjectCard.tsx
│  │  ├─ sections
│  │  │  ├─ AboutPreview.tsx
│  │  │  ├─ Clients.tsx
│  │  │  ├─ ContactPreview.tsx
│  │  │  ├─ Services.tsx
│  │  │  └─ WorksPreview.tsx
│  │  ├─ UploadForm.tsx
│  │  └─ VideoListAdmin.tsx
│  ├─ data
│  │  └─ mockVideos.ts
│  ├─ db
│  ├─ lib
│  │  ├─ cloudinary.ts
│  │  └─ prisma.ts
│  ├─ middleware.ts
│  └─ utils
│     └─ cloudinary.ts
├─ tailwind.config.ts
└─ tsconfig.json
N.s

```

videographer-portfolio-p
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ prisma
│ ├─ migrations
│ │ ├─ 20250726003636_init
│ │ │ └─ migration.sql
│ │ ├─ 20250726015742_add_orientation
│ │ │ └─ migration.sql
│ │ ├─ 20250726163955_add_public_id
│ │ │ └─ migration.sql
│ │ └─ migration_lock.toml
│ └─ schema.prisma
├─ public
│ ├─ audio
│ │ └─ intro-bg.mp3
│ ├─ favico.ico
│ ├─ favicon.ico
│ ├─ grain.png
│ ├─ hero-bg.jpg
│ ├─ Logo Dark.svg
│ ├─ logos
│ │ ├─ gucci.svg
│ │ ├─ max.svg
│ │ ├─ mtvbase.svg
│ │ ├─ northface.svg
│ │ ├─ sony.svg
│ │ ├─ unitednations.svg
│ │ └─ youtube.svg
│ ├─ me.jpg
│ ├─ noise.png
│ ├─ noise.svg
│ ├─ og-image.png
│ ├─ profile.jpg
│ └─ videos
│ └─ hero-bg.mp4
├─ README.md
├─ src
│ ├─ app
│ │ ├─ about
│ │ │ └─ page.tsx
│ │ ├─ admin
│ │ │ └─ page.tsx
│ │ ├─ api
│ │ │ └─ videos
│ │ │ ├─ latest
│ │ │ │ └─ route.ts
│ │ │ ├─ route.ts
│ │ │ ├─ stats
│ │ │ │ └─ route.ts
│ │ │ └─ [id]
│ │ │ └─ route.ts
│ │ ├─ contact
│ │ │ └─ page.tsx
│ │ ├─ globals.css
│ │ ├─ layout.tsx
│ │ ├─ page.tsx
│ │ ├─ projects
│ │ │ └─ page.tsx
│ │ └─ sign-in
│ │ └─ [[...sign-in]]
│ │ └─ page.tsx
│ ├─ components
│ │ ├─ AdminStats.tsx
│ │ ├─ Footer.tsx
│ │ ├─ Hero.tsx
│ │ ├─ Navbar.tsx
│ │ ├─ ProjectCard.tsx
│ │ ├─ sections
│ │ │ ├─ AboutPreview.tsx
│ │ │ ├─ Clients.tsx
│ │ │ ├─ ContactPreview.tsx
│ │ │ ├─ Services.tsx
│ │ │ └─ WorksPreview.tsx
│ │ ├─ UploadForm.tsx
│ │ └─ VideoListAdmin.tsx
│ ├─ data
│ │ └─ mockVideos.ts
│ ├─ db
│ ├─ lib
│ │ ├─ cloudinary.ts
│ │ └─ prisma.ts
│ ├─ middleware.ts
│ └─ utils
│ └─ cloudinary.ts
├─ tailwind.config.ts
└─ tsconfig.json

```

```

videographer-portfolio-p
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ prisma
│ ├─ migrations
│ │ ├─ 20250726003636_init
│ │ │ └─ migration.sql
│ │ ├─ 20250726015742_add_orientation
│ │ │ └─ migration.sql
│ │ ├─ 20250726163955_add_public_id
│ │ │ └─ migration.sql
│ │ └─ migration_lock.toml
│ └─ schema.prisma
├─ public
│ ├─ audio
│ │ └─ intro-bg.mp3
│ ├─ favico.ico
│ ├─ favicon.ico
│ ├─ grain.png
│ ├─ hero-bg.jpg
│ ├─ Logo Dark.svg
│ ├─ logos
│ │ ├─ gucci.svg
│ │ ├─ max.svg
│ │ ├─ mtvbase.svg
│ │ ├─ northface.svg
│ │ ├─ sony.svg
│ │ ├─ unitednations.svg
│ │ └─ youtube.svg
│ ├─ me.jpg
│ ├─ noise.png
│ ├─ noise.svg
│ ├─ og-image.png
│ ├─ profile.jpg
│ └─ videos
│ └─ hero-bg.mp4
├─ README.md
├─ src
│ ├─ app
│ │ ├─ about
│ │ │ └─ page.tsx
│ │ ├─ admin
│ │ │ └─ page.tsx
│ │ ├─ api
│ │ │ └─ videos
│ │ │ ├─ latest
│ │ │ │ └─ route.ts
│ │ │ ├─ route.ts
│ │ │ ├─ stats
│ │ │ │ └─ route.ts
│ │ │ └─ [id]
│ │ │ └─ route.ts
│ │ ├─ contact
│ │ │ └─ page.tsx
│ │ ├─ globals.css
│ │ ├─ layout.tsx
│ │ ├─ page.tsx
│ │ ├─ projects
│ │ │ └─ page.tsx
│ │ └─ sign-in
│ │ └─ [[...sign-in]]
│ │ └─ page.tsx
│ ├─ components
│ │ ├─ AdminStats.tsx
│ │ ├─ Footer.tsx
│ │ ├─ Hero.tsx
│ │ ├─ Navbar.tsx
│ │ ├─ ProjectCard.tsx
│ │ ├─ sections
│ │ │ ├─ AboutPreview.tsx
│ │ │ ├─ Clients.tsx
│ │ │ ├─ ContactPreview.tsx
│ │ │ ├─ Services.tsx
│ │ │ └─ WorksPreview.tsx
│ │ ├─ UploadForm.tsx
│ │ └─ VideoListAdmin.tsx
│ ├─ lib
│ │ ├─ cloudinary.ts
│ │ └─ prisma.ts
│ ├─ middleware.ts
│ └─ utils
│ └─ cloudinary.ts
├─ tailwind.config.ts
└─ tsconfig.json

```

```

videographer-portfolio-p
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ prisma
│ ├─ migrations
│ │ ├─ 20250726003636_init
│ │ │ └─ migration.sql
│ │ ├─ 20250726015742_add_orientation
│ │ │ └─ migration.sql
│ │ ├─ 20250726163955_add_public_id
│ │ │ └─ migration.sql
│ │ └─ migration_lock.toml
│ └─ schema.prisma
├─ public
│ ├─ audio
│ │ └─ intro-bg.mp3
│ ├─ favico.ico
│ ├─ favicon.ico
│ ├─ grain.png
│ ├─ hero-bg.jpg
│ ├─ Logo Dark.svg
│ ├─ logos
│ │ ├─ gucci.svg
│ │ ├─ max.svg
│ │ ├─ mtvbase.svg
│ │ ├─ northface.svg
│ │ ├─ sony.svg
│ │ ├─ unitednations.svg
│ │ └─ youtube.svg
│ ├─ me.jpg
│ ├─ noise.png
│ ├─ noise.svg
│ ├─ og-image.png
│ ├─ profile.jpg
│ └─ videos
│ └─ hero-bg.mp4
├─ README.md
├─ src
│ ├─ app
│ │ ├─ about
│ │ │ └─ page.tsx
│ │ ├─ admin
│ │ │ └─ page.tsx
│ │ ├─ api
│ │ │ └─ videos
│ │ │ ├─ latest
│ │ │ │ └─ route.ts
│ │ │ ├─ route.ts
│ │ │ ├─ stats
│ │ │ │ └─ route.ts
│ │ │ └─ [id]
│ │ │ └─ route.ts
│ │ ├─ contact
│ │ │ └─ page.tsx
│ │ ├─ globals.css
│ │ ├─ layout.tsx
│ │ ├─ page.tsx
│ │ ├─ projects
│ │ │ └─ page.tsx
│ │ └─ sign-in
│ │ └─ [[...sign-in]]
│ │ └─ page.tsx
│ ├─ components
│ │ ├─ AdminStats.tsx
│ │ ├─ Footer.tsx
│ │ ├─ Hero.tsx
│ │ ├─ Navbar.tsx
│ │ ├─ ProjectCard.tsx
│ │ ├─ sections
│ │ │ ├─ AboutPreview.tsx
│ │ │ ├─ Clients.tsx
│ │ │ ├─ ContactPreview.tsx
│ │ │ ├─ Services.tsx
│ │ │ └─ WorksPreview.tsx
│ │ ├─ UploadForm.tsx
│ │ └─ VideoListAdmin.tsx
│ ├─ lib
│ │ ├─ cloudinary.ts
│ │ └─ prisma.ts
│ ├─ middleware.ts
│ └─ utils
│ └─ cloudinary.ts
├─ tailwind.config.ts
└─ tsconfig.json

```

Videos added
Videos added
```
