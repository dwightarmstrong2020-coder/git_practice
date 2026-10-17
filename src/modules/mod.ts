//TODO: Write Control class

export abstract class Resource {
    abstract get resPath(): string
    protected url!: string
    protected getPath(r: Resource) {
        return r.resPath
    }

    static getURL(r: Resource) {
        return r.url
    }
    static setURL(r: Resource, resURL: string | URL) {
        if (r.url === undefined) return;
        else {
            if (typeof resURL === "string") r.url = resURL as string;
            else r.url = (resURL as URL).toString();
        }
    }
}

export class Scene extends Resource {
    rootNode: Node
    private _resPath: string
    constructor(rN: Node, resPath: string) {
        super()
        this.rootNode = rN
        this._resPath = resPath
    }

    get resPath() {
        return this._resPath;
    }
}

export class Node extends Resource {
    scene: Scene
    _resPath: string
    constructor(s: Scene, r: string) {
        super()
        this.scene = s
        this._resPath = r
    }
    get resPath() {
        return this._resPath
    }
}

export interface CanvasItem extends Node {
    canvas: CanvasRenderingContext2D
    draw(): void

}

export abstract class Node2D extends Node implements CanvasItem {
    canvas: CanvasRenderingContext2D

    constructor(canvas: CanvasRenderingContext2D, s: Scene, public x?: number, public y?: number, r: string = "") {
        super(s, r);
        this.canvas = canvas;
    }

    abstract draw(): void
}

export class Canvas2D extends Node2D {
    draw(): void {
        throw new Error("Method not implemented.");
    }
}

export class HTMLNode extends Node {
    constructor(url: URL, file: Blob, s: Scene) {
        super(s, '');
        this.url = url.toString();
    }

    async fech() {
        return (await fetch(this.url)).blob();
    }
}