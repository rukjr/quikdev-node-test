import { IHistory } from "../interfaces/IHistory";
import { HistoryRepository } from "../repositories/HistoryRepository";

export class HistoryService {
  private postRepository = new HistoryRepository();

  async createHistory(data: IHistory) {
    return this.postRepository.createHistory(data);
  }

  async deleteHistory(id: number) {
    return this.postRepository.deleteHistory(id);
  }
}
