import { Router } from 'express';
import { getMonthlyRevenueStatistics, getRevenueStatisticsByDay } from '../controllers/dashboard.js';

const Router_Dashboard = Router();

Router_Dashboard.get('/dashboard/revenue-statistics-by-day', getRevenueStatisticsByDay);
Router_Dashboard.get('/dashboard/month', getMonthlyRevenueStatistics);

export default Router_Dashboard;