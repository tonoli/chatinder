// @flow
import {emojify} from './emojify'
import type {PersonType} from '~/shared/types'


export function normalizePerson(person: any): PersonType {
	const prsn = Object.assign({}, person);
	prsn.formattedName = emojify(person.name);
	prsn.formattedBio = emojify(person.bio);
	return prsn
}