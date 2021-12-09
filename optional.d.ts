declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<
        SVGSVGElement
    > & { title?: string, style?:any, className?: string }>;

    const src: string;
    export default src;
}