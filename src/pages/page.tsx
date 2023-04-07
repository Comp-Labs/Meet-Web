import * as React from "react";
import { createHash } from 'crypto';

export default function Page() {
    const lowerCaseText = 'complabs28@gmail.com';
    const md5String = createHash('md5').update(lowerCaseText).digest('hex');
    return (
        <>
            <p>{md5String}</p>
        </>
    )
}