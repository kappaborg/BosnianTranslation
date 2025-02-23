declare module 'mammoth' {
  interface ExtractResult {
    value: string;
    messages: any[];
  }

  interface Options {
    arrayBuffer: ArrayBuffer;
  }

  export function extractRawText(options: Options): Promise<ExtractResult>;
}

declare module 'pdfjs-dist' {
  export const version: string;
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };
  
  export function getDocument(options: {
    data: ArrayBuffer;
  }): {
    promise: Promise<{
      numPages: number;
      getPage(pageNumber: number): Promise<{
        getTextContent(): Promise<{
          items: Array<{
            str: string;
          }>;
        }>;
      }>;
    }>;
  };
}

declare module 'pdfjs-dist/build/pdf.worker.entry' {
  const workerSrc: string;
  export default workerSrc;
} 