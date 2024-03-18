import { AppDataSource } from "../data/data-source";
import { History } from "../entities/History";
import { User } from "../entities/User";
import { IHistory } from "../interfaces/IHistory";

export class HistoryRepository {

  async createHistory(data: IHistory) {
    const history = new History();
    history.title = data.title;
    history.description = data.description;

    if (data.imagePath) {
      history.imagePath = data.imagePath;
    }

    const historyRepository = AppDataSource.getRepository(History);
    await historyRepository.save(history);

    return history;
  }

  async deleteHistory(id: number) {
    const historyRepository = AppDataSource.getRepository(History);
    const historyToDelete = await historyRepository.findOneBy({ id });
    if (historyToDelete) {
      await historyRepository.remove(historyToDelete);
    } else {
      throw new Error("History not found");
    }
  }
}
