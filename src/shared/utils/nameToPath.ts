import {
	VIEW_CHAT,
	VIEW_USER,
	VIEW_LOADING,
	VIEW_MATCHES,
	VIEW_PROFILE
} from '~/shared/constants/view'

export function nameToPath(name: string, param?: string): string {
	switch (name) {
		case VIEW_CHAT:
			return `${nameToPath(VIEW_MATCHES)}/${param || ':id'}/${VIEW_CHAT}`
		case VIEW_USER:
			return `${nameToPath(VIEW_MATCHES)}/${param || ':id'}/${VIEW_USER}`
		case VIEW_LOADING:
			return `/${VIEW_LOADING}/${param || ':title'}`
		case VIEW_PROFILE:
			return `${nameToPath(VIEW_MATCHES)}/${VIEW_PROFILE}`
		default:
			return `/${name}`
	}
}
