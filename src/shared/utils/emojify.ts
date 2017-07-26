import emojione from '~/app/shims/emojione'
import * as he from 'he'

export function emojify(text: string): string {
	return emojione.unicodeToImage(he.escape(text))
}