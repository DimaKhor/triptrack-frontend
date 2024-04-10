// @ts-ignore
import { Observer } from "mobx-react";
import Form from "./Form";

export function Login() {

    return (
        <Observer>
            {() => (
                <Form />
            )}
        </Observer>
    );
}
