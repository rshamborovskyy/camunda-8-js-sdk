// eslint-disable-next-line no-undef
module.exports = {
	branches: [
		'main',
		{
			name: 'alpha',
			prerelease: true,
		},
	],
	repositoryUrl: 'https://github.com/camunda/camunda-8-js-sdk.git',
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				releaseRules: [
					{
						type: 'feat',
						release: 'patch',
					},
					{
						type: 'fix',
						release: 'patch',
					},
					{
						type: 'release',
						release: 'patch',
					},
					{
						type: 'minor',
						release: 'minor',
					},
				],
			},
		],
		[
			'@semantic-release/release-notes-generator',
			{
				writerOpts: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					transform: (commit, context) => {
						let body = commit.body || ''
						let footer = commit.footer || ''

						// Wrap long lines in body and footer
						body = body.replace(/(.{1,100})/g, '$1\n')
						footer = footer.replace(/(.{1,100})/g, '$1\n')

						commit.body = body
						commit.footer = footer

						return commit
					},
				},
			},
		],
		'@semantic-release/changelog',
		['@semantic-release/npm', {}],
		[
			'@semantic-release/git',
			{
				assets: ['package.json'],
				message:
					'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
		'@semantic-release/git',
	],
}