import { useTasks } from '@/task/hooks/useGetTasks';
import { Board, Skeleton, SkeletonArray } from 'erxes-ui';
import { useAtomValue } from 'jotai';
import { currentUserState } from 'ui-modules';
import { TaskBoardCard } from '@/task/components/TaskBoardCard';
import { ErrorBoundary } from './ErrorBoundary';

export const CustomerTasks = () => {
  return (
    <ErrorBoundary>
      <Board id="customer-tasks">
        <TasksBoardCards />
      </Board>
    </ErrorBoundary>
  );
};

export const TasksBoardCards = () => {
  const currentUser = useAtomValue(currentUserState);
  const { tasks, totalCount, loading } = useTasks({
    variables: {
      userId: currentUser?._id,
    },
    skip: !currentUser?._id,
  });

  if (!currentUser?._id) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No user logged in
      </div>
    );
  }

  if (loading) {
    return (
      <>
        <Board.Header>
          <h4 className="capitalize flex items-center gap-1 pl-1">
            Customer tasks
            <span className="text-accent-foreground font-medium pl-1">
              <Skeleton className="size-4 rounded" />
            </span>
          </h4>
        </Board.Header>
        <Board.Cards id="customer-tasks" items={[]}>
          <SkeletonArray
            className="p-24 w-full rounded shadow-xs opacity-80"
            count={10}
          />
        </Board.Cards>
      </>
    );
  }

  if (!tasks || !Array.isArray(tasks)) {
    return (
      <>
        <Board.Header>
          <h4 className="capitalize flex items-center gap-1 pl-1">
            Customer tasks
            <span className="text-accent-foreground font-medium pl-1">0</span>
          </h4>
        </Board.Header>
        <Board.Cards id="customer-tasks" items={[]}>
          <div className="p-4 text-center text-muted-foreground">
            No tasks found
          </div>
        </Board.Cards>
      </>
    );
  }

  return (
    <>
      <Board.Header>
        <h4 className="capitalize flex items-center gap-1 pl-1">
          Customer tasks
          <span className="text-accent-foreground font-medium pl-1">
            {loading ? (
              <Skeleton className="size-4 rounded" />
            ) : (
              totalCount || 0
            )}
          </span>
        </h4>
        {/* <TaskCreateSheetTrigger status={column.id} /> */}
      </Board.Header>
      <Board.Cards id="customer-tasks" items={tasks.map((task) => task._id)}>
        {loading ? (
          <SkeletonArray
            className="p-24 w-full rounded shadow-xs opacity-80"
            count={10}
          />
        ) : (
          tasks
            .filter((task) => task && task._id)
            .map((task) => (
              <Board.Card
                key={task._id}
                id={task._id}
                name={task.name || 'Untitled Task'}
                column="customer-tasks"
              >
                <TaskBoardCard id={task._id} column="customer-tasks" />
              </Board.Card>
            ))
        )}
        {/* <TaskCardsFetchMore
          totalCount={taskCountByBoard[column.id] || 0}
          currentLength={boardCards.length}
          handleFetchMore={() =>
            handleFetchMore({ direction: EnumCursorDirection.FORWARD })
          }
        /> */}
      </Board.Cards>
    </>
  );
};
