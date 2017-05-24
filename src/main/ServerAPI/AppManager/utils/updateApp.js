// @flow
import os from 'os'
import { app, autoUpdater, dialog } from 'electron'
import type { AppManager } from '../AppManager'

const version = app.getVersion()
const platform = `${os.platform()}_${os.arch()}`
const updateURL = `https://chatinder.herokuapp.com/update/${platform}/${version}`

export function updateApp(instance: AppManager) {
	autoUpdater.setFeedURL(updateURL)

	// Ask the user if update is available
	autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
		let message = `${app.getName()} ${releaseName} is now available. It will be installed the next time you restart the application.`
		if (releaseNotes) {
			const splitNotes = releaseNotes.split(/[^\r]\n/)
			message += '\n\nRelease notes:\n'
			splitNotes.forEach(notes => {
				message += notes + '\n\n'
			})
		}
		// Ask user to update the app
		dialog.showMessageBox(
			{
				type: 'question',
				buttons: ['Install and Relaunch', 'Later'],
				defaultId: 0,
				message: `A new version of ${app.getName()} has been downloaded`,
				detail: message
			},
			response => {
				if (response === 0) {
					instance.updateAvailable = true
					instance._window.close()
					instance._window = null
					setTimeout(() => autoUpdater.quitAndInstall(), 1)
				}
			}
		)
	})
	// init for updates
	autoUpdater.checkForUpdates()
}
