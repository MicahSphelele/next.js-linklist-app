import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type ButtonDTO = {
    id: number
    key: string;
    label: string;
    icon: IconDefinition,
    placeholder?: string
}