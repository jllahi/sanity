import {comments} from '../comments/plugin'
import {DEFAULT_SCHEDULED_PUBLISH_PLUGIN_OPTIONS} from '../scheduledPublishing/constants'
import {SCHEDULED_PUBLISHING_NAME, scheduledPublishing} from '../scheduledPublishing/plugin'
import {tasks, TASKS_NAME} from '../tasks/plugin'
import {
  type DefaultPluginsWorkspaceOptions,
  type SingleWorkspace,
  type WorkspaceOptions,
} from './types'

const defaultPlugins = [comments(), tasks(), scheduledPublishing()]

export function getDefaultPlugins(options: DefaultPluginsWorkspaceOptions) {
  return defaultPlugins.filter((plugin) => {
    if (plugin.name === SCHEDULED_PUBLISHING_NAME) {
      return options.scheduledPublishing.enabled
    }
    if (plugin.name === TASKS_NAME) {
      return options.tasks.enabled
    }
    return true
  })
}

export function getDefaultPluginsOptions(
  workspace: WorkspaceOptions | SingleWorkspace,
): DefaultPluginsWorkspaceOptions {
  return {
    tasks: {
      enabled: true,
      ...workspace.unstable_tasks,
    },
    scheduledPublishing: {
      ...DEFAULT_SCHEDULED_PUBLISH_PLUGIN_OPTIONS,
      ...workspace.scheduledPublishing,
    },
  }
}
