// @ts-ignore
import { Observer } from "mobx-react";
import styled from "styled-components";
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
