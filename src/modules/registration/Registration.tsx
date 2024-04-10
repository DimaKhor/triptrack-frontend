// @ts-ignore
import { Observer } from "mobx-react";
import Form from "./Form";

export function Registration() {

    return (
        <Observer>
            {() => (
                <Form />
            )}
        </Observer>
    );
}
