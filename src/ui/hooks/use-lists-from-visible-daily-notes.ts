import { TFile } from "obsidian";
import { derived, Readable } from "svelte/store";

import { DataviewFacade } from "../../service/dataview-facade";
import * as query from "../../util/dataview-query";

export function computeListsFromVisibleDailyNotes(
  visibleDailyNotes: TFile[],
  dataviewFacade: DataviewFacade,
) {
  if (visibleDailyNotes.length === 0) {
    return [];
  }

  return dataviewFacade.getAllListsFrom(query.anyOf(visibleDailyNotes));
}

export function useListsFromVisibleDailyNotes(
  visibleDailyNotes: Readable<TFile[]>,
  debouncedTaskUpdateTrigger: Readable<unknown>,
  dataviewFacade: DataviewFacade,
) {
  return derived(
    [visibleDailyNotes, debouncedTaskUpdateTrigger],
    ([$visibleDailyNotes]) =>
      computeListsFromVisibleDailyNotes($visibleDailyNotes, dataviewFacade),
  );
}
