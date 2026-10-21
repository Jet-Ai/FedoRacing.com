import type { Metadata } from 'next';
export const metadata: Metadata = {title:'FedoRacing',description:'Drift, tuning a pretekárske autá.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="sk"><body>{children}</body></html>;}
