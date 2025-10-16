// Global type declarations for styling imports
// Allows importing .css and other asset files without TypeScript errors

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.styl';

// Optionally declare image types
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
// Allow importing assets with the ?url suffix to get a string URL
declare module '*?url';
