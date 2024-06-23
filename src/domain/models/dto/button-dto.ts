import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type ButtonDTO = {
    key: string;
    label: string;
    icon: IconDefinition,
    placeholder?: string
}