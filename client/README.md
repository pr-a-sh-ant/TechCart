# TechCart Client

This is the client-side application for TechCart, an e-commerce platform for tech products.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run start
```

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
└── README.md
```

## Environment Variables

Create a `.env` file in the root of the server directory with the following structure:

```plaintext
REACT_APP_API_URL = yourapiurl

REACT_APP_CLOUDINARY_API_KEY = yourapikey
REACT_APP_CLOUDINARY_CLOUD_NAME = yourapiname
```

## Available Scripts

- `npm run start` - Starts development server
- `npm run build` - Builds for production

## Tech Stack

- React.js
- Vite
- Tailwind CSS

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request
