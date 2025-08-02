import { BoardEntity } from "../../domain/entities/board.entity.";
import { IBoardTaskResponse } from "../interfaces/board.interface";

export class BoardMapper {
  static parseSingleObject(data: IBoardTaskResponse) {
    return new BoardEntity(
      data.backlog,
      data.todo,
      data.inProgress,
      data.inReview,
      data.done
    );
  }
}
