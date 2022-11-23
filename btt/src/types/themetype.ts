export interface theme{
    background: string
    fontColor: string
    buttonbg: string
    buttonfg: string
    playgroundcolor: string
    right: string
    wrong: string
    normal: string
}


export default interface themeType{
    theme: number
    fontSize: number
    fontfamily: string,
    error:string | null
}