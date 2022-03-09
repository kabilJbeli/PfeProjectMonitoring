import {Sprint} from './Sprint';
import {Report} from './Report';
import {Task} from './Task';
import {Member} from './Member';

export interface Project {
  projectID: Number;
  sprint: Sprint[];
  report: Report[];
  tasks: Task[];
  projectStatus: any;
  members: Member[];
  projectTitle: String;
  projectDescription: String;
  startDate: Date;
  endDate: Date;
}
