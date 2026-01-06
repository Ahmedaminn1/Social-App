export interface UserType {
    message : string,
    user :UserObject
}


interface UserObject {
    _id :string,
    name:string,
    photo:string
}