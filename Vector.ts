export interface VectorProps {
    x: number;
    y: number;
}

export class Vector implements VectorProps{
    public x: number;
    public y: number;

    public static create(props:VectorProps){
        return new Vector(props);
    }

    private constructor(props:VectorProps){
        this.x = props.x;
        this.y = props.y;
    }

    public add(other:VectorProps){
        this.x += other.x;
        this.y += other.y;
    }

    public assign(props:VectorProps){
        this.x = props.x;
        this.y = props.y;
    }
}