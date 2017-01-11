import {observable, action, computed, asMap, transaction} from 'mobx'
import sortBy from 'lodash/sortby'
import forEach from 'lodash/forEach'
import {MatchStore} from './MatchStore'
import {PersonStore} from './PersonStore'


export class TinderStore {
	@observable matches = asMap();
	@observable profile;

	constructor({matches, profile}) {
		this.setMatches({matches, raw: false});
		this.setProfile(profile);
	}

	@action setMatches = ({matches, raw}) => {
		forEach(matches, match => {
			this.matches.set(match['_id'], new MatchStore({match, raw}))
		});
	};

	@action setProfile = (person) => {
		if (person) {
			this.profile = new PersonStore(person);
		}
	};

	@computed get isProfilePresent() {
		return !!this.profile;
	}

	@computed get dataIsPresent() {
		return (!!this.matches && this.matches.size > 0)
	}

	@computed get sortedIds() {
		return sortBy(this.matches.values(), match => -(new Date(match.lastActivityDate))).map(match => match['_id'])
	}
}