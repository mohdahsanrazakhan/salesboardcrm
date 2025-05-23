import express from 'express';
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam
} from '../controllers/teams.controller.js';

const router = express.Router();

router.post('/', createTeam);
router.get('/', getAllTeams);
router.get('/:id', getTeamById);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

export default router;
