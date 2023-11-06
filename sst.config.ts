import type { SSTConfig } from 'sst';
import type { StackContext } from 'sst/constructs';

export const sslArn = 'arn:aws:acm:us-east-1:984261700405:certificate/24468e38-fdcf-4133-b506-d92071a3ee5a';

export const Home = ({ stack, app }: StackContext) => {

};

export default {
	config() {
		return {
			name: 'd-labs',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(Home);
	},
} satisfies SSTConfig;

const homeAlias = {
	production: ' ',
	staging: 'stg.',
	development: 'dev.',
};

export const homeDomainFromStage = (stage: string) => {
	const prefix = homeAlias[stage] || `${stage}.`;
	return `${prefix.trim()}d-labs.fun`;
};
