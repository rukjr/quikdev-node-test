import { Request, Response } from "express";
import { HistoryService } from "../services/HistoryService";
import { IHistory } from "../interfaces/IHistory";
import { CustomRequest } from "../@types/customRequest";

export class HistoryController {
  private historyService = new HistoryService();

  async createHistory(req: CustomRequest, res: Response) {
    try {
      const { title, description } = req.body;
      const user_id = req.user?.userId;

      if (!user_id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const historyData:IHistory = {
        title,
        description,
        user_id: parseInt(user_id),
        imagePath: req.file ? req.file.filename : undefined,
      };

      const history = await this.historyService.createHistory(historyData);

      if (history) {
        res.json(history);
      } else {
        res.status(404).json({ message: "Creating a history is not working now, try later" });
      }
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  async deleteHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.historyService.deleteHistory(parseInt(id));
      res.json({ message: "History deleted successfully." });
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }
}
