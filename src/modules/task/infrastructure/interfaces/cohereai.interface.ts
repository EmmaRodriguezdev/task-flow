export interface IContentResponseCohereAI {
  type: string;
  text: string;
}

export interface IResponseCohereAI {
  id: string;
  message: {
    role: string;
    content: IContentResponseCohereAI[];
  };
  finishReason: string;
  usage: {
    billedUnits: {
      inputTokens: number;
      outputTokens: number;
    };
    tokens: {
      inputTokens: number;
      outputTokens: number;
    };
  };
}
