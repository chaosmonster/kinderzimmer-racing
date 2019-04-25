export interface BoxProps {
    width: number;
    height: number;
}

export type OptionalBoxProps = Partial<BoxProps>;

export class Box implements BoxProps{
    readonly width: number;
    readonly height: number;
    public static create(props?:OptionalBoxProps,defaultProps = {width:0,height:0}){
        if(props){
            defaultProps.width =typeof props.width === 'number' ? props.width : defaultProps.width;
            defaultProps.height =typeof props.height === 'number' ? props.height : defaultProps.height;
        }
        return new Box(defaultProps);
    }

    private constructor(props:BoxProps){
        this.width = props.width;
        this.height = props.height;
    }
}