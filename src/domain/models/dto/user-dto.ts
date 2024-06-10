
export type UserDTO = {
    name: string,
    email: string,
    image: string,
    imageKey: string,
    emailVerified: Date,
}

export type UserDTOKeys = keyof UserDTO;