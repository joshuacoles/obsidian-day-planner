import { DataArray, STask } from "obsidian-dataview";
import { derived, Readable } from "svelte/store";

import { DayPlannerSettings } from "../../settings";

interface UseDataviewTasksProps {
  listsFromVisibleDailyNotes: Readable<DataArray<STask>>;
  tasksFromExtraSources: Readable<DataArray<STask>>;
  settingsStore: Readable<DayPlannerSettings>;
}

export function computeDataviewTasks(
  $listsFromVisibleDailyNotes: DataArray<STask>,
  $tasksFromExtraSources: DataArray<STask>,
  $settingsStore: DayPlannerSettings,
) {
  const allTasks = [...$listsFromVisibleDailyNotes, ...$tasksFromExtraSources];

  return $settingsStore.showCompletedTasks
    ? allTasks
    : allTasks.filter((sTask: STask) => !sTask.completed);
}

export function useDataviewTasks({
  listsFromVisibleDailyNotes,
  tasksFromExtraSources,
  settingsStore,
}: UseDataviewTasksProps) {
  return derived(
    [listsFromVisibleDailyNotes, tasksFromExtraSources, settingsStore],
    (args) => computeDataviewTasks(...args),
  );
}
