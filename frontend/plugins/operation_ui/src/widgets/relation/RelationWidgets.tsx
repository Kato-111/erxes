import { Task } from './modules/Task';
import { CustomerTasks } from './components/CustomerTasks';

export const RelationWidgets = ({
  module,
  contentId,
  contentType,
}: {
  module: any;
  contentId: string;
  contentType: string;
}) => {
  if (contentType === 'core:customer') {
    return <CustomerTasks />;
  }
  if (module === 'tasks') {
    return <Task contentId={contentId} contentType={contentType} />;
  }

  return <div>Operation Widget</div>;
};

export default RelationWidgets;
