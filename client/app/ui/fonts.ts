import localFont from 'next/font/local';

export const outfit = localFont({
    src: [
        { path: '../../public/fonts/outfit/Outfit-Thin.woff2', weight: '100', style: 'normal' },
        { path: '../../public/fonts/outfit/Outfit-ExtraLight.woff2', weight: '200', style: 'normal' },
        { path: '../../public/fonts/outfit/Outfit-Light.woff2', weight: '300', style: 'normal' },
        { path: '../../public/fonts/outfit/Outfit-Regular.woff2', weight: '400', style: 'normal' },
        { path: '../../public/fonts/outfit/Outfit-Medium.woff2', weight: '500', style: 'normal' },
        { path: '../../public/fonts/outfit/Outfit-SemiBold.woff2', weight: '600', style: 'normal' },
        { path: '../../public/fonts/outfit/Outfit-Bold.woff2', weight: '700', style: 'normal' },
        { path: '../../public/fonts/outfit/Outfit-ExtraBold.woff2', weight: '800', style: 'normal' },
        { path: '../../public/fonts/outfit/Outfit-Black.woff2', weight: '900', style: 'normal' },
    ],
    variable: '--font-outfit',
    display: 'swap',
});
