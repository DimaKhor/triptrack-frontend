// @ts-ignore
import { Observer } from "mobx-react";
import styled from "styled-components";
import Form from "./Form";

export function Main() {

    return (
        <Observer>
            {() => (
                    <Form />
            )}
        </Observer>
    );
}
