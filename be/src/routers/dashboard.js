import { Router } from 'express';
import { get_order_limit_5, getMonthlyRevenueStatistics, getRevenueStatisticsByDay } from '../controllers/dashboard.js';

const Router_Dashboard = Router();

Router_Dashboard.get('/dashboard/revenue-statistics-by-day', getRevenueStatisticsByDay);
Router_Dashboard.get('/dashboard/month', getMonthlyRevenueStatistics);
Router_Dashboard.get('/dashboard/get_order_limit', get_order_limit_5);

export default Router_Dashboard;