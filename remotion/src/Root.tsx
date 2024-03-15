import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import './style.css';
import data from '../public/remotion.json';

export const RemotionRoot: React.FC = () => {
	const colors = ['yellow', '#1EF709', 'red', '#FF9209', '#39A7FF', '#F875AA'];
	const selectedColor = colors[Math.floor(Math.random() * colors.length)];

	const duration =
		data.alignment_prompt.duration + data.alignment_joke.duration + 4 * 2.5 + 4;
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={Math.round(duration * 24)}
				fps={24}
				width={1080}
				height={1920}
				defaultProps={{selectedColor}}
			/>
		</>
	);
};
