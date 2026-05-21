import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import issueUpdateAuth from "../../middleware/issueUpdate.auth";
import { Roles } from "../../types";

const router = Router()

router.post('/',auth(Roles.contributor,Roles.maintainer),issuesController.createIssues)
router.get('/',issuesController.getIssues)
router.get('/:id',issuesController.getSingleIssue)
router.put('/:id',auth(Roles.contributor,Roles.maintainer),issueUpdateAuth(),issuesController.updateIssue)


const issuesRouter = router
export default issuesRouter