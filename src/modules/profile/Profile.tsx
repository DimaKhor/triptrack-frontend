// @ts-ignore
import { Observer } from "mobx-react";
import Form from "./Form";

export function Profile() {

    return (
        <Observer>
            {() => (
                <Form />
            )}
        </Observer>
    );
}
