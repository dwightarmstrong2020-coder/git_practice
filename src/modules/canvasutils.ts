import { Canvas2D, Scene } from './mod.ts';

function create(canvas: string, id?: string | Scene): CanvasRenderingContext2D | Canvas2D;
function create(canvas: CanvasRenderingContext2D | string, id: Scene): Canvas2D;
function create(canvas?: CanvasRenderingContext2D | string, id?: string | Scene): CanvasRenderingContext2D | Canvas2D {
   if(typeof canvas === typeof CanvasRenderingContext2D) {
        return new Canvas2D(canvas as CanvasRenderingContext2D, id as Scene);
   } else if(typeof canvas === 'string') {
        return (document.getElementById(canvas as string) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
   }
   let x = document.createElement('canvas');
   document.append(x);
   return x.getContext('2d') as CanvasRenderingContext2D;
}