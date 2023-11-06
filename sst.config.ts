import type { SSTConfig } from 'sst';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

export const sslArn = 'arn:aws:acm:us-east-1:984261700405:certificate/24468e38-fdcf-4133-b506-d92071a3ee5a';

export const Home = ({ stack, app }: StackContext) => {
  const domain = homeDomainFromStage(app.stage);
  const certificate = Certificate.fromCertificateArn(stack, 'w-cert', sslArn);
  const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
    domainName: 'd-labs.fun',
  });

	const site = new NextjsSite(stack, 'home-edge', {
		path: './',
		edge: true,
		timeout: '5 seconds',
		memorySize: '1024 MB',
		runtime: 'nodejs18.x',
		customDomain: {
			domainName: domain,
			cdk: { hostedZone, certificate },
		},
	});

	stack.addOutputs({
		url: site.url || 'localhost',
		customDomain: domain,
	});
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
	const prefix: string = homeAlias[stage as never] || `${stage}.`;
	return `${prefix.trim()}d-labs.fun`;
};
