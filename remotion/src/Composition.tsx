import {
	AbsoluteFill,
	Audio,
	Img,
	Sequence,
	Series,
	Video,
	staticFile,
	useVideoConfig,
} from 'remotion';
import data from '../public/remotion.json';
import {VideoProgress} from './VideoProgress';

export const MyComposition = (props: any) => {
	const videoConfig = useVideoConfig();
	const {selectedColor} = props;
	return (
		<>
			<AbsoluteFill>
				<Audio src={staticFile('audio.wav')} />

				<Audio src={staticFile('bg_music.mp3')} volume={0.5}></Audio>
				<Video
					height={videoConfig.height}
					width={videoConfig.width}
					muted={true}
					src={data.bg_video}
				></Video>

				<AbsoluteFill
					style={{
						backgroundColor: 'black',
						opacity: 0.25,
						width: '100%',
						height: '100%',
					}}
				></AbsoluteFill>
				<Series>
					{data.alignment_prompt.alignment.words.map((word, idx) => {
						return (
							<Series.Sequence
								key={`text-${idx}`}
								durationInFrames={Math.round(
									videoConfig.fps * (word.end_time - word.start_time)
								)}
							>
								{data.unsplash_images_prompt.hasOwnProperty(word.word) ? (
									<AbsoluteFill
										style={{
											top: '20%',
											display: 'flex',
											alignContent: 'center',
											justifyItems: 'center',
											justifyContent: 'center',
											flexDirection: 'row',
										}}
									>
										<Img
											src={
												data.unsplash_images_prompt[
													word.word as keyof typeof data.unsplash_images_prompt
												]
											}
											style={{maxHeight: '20%', borderRadius: '5%'}}
											width="auto"
										></Img>
									</AbsoluteFill>
								) : null}
								<AbsoluteFill
									style={{
										top: '45%',
										textAlign: 'center',
										fontSize: '3.5em',
										color: selectedColor,
										fontFamily: 'Obelix Pro Italic',
									}}
								>
									<h1>{word.word == ',' ? '' : word.word}</h1>
								</AbsoluteFill>
							</Series.Sequence>
						);
					})}
					{/* silence */}
					<Series.Sequence durationInFrames={videoConfig.fps * 0.5}>
						<div></div>
					</Series.Sequence>

					{data.images.map((img, idx: number) => {
						return (
							<Series.Sequence
								key={`image-${idx}`}
								durationInFrames={Math.round(videoConfig.fps * 2.5)}
							>
								<AbsoluteFill
									style={{
										top: '9%',
										textAlign: 'center',
										fontSize: '2.5em',
										color: selectedColor,
									}}
								></AbsoluteFill>

								<AbsoluteFill
									style={{
										padding: '15% 10%',
										top: '10%',
									}}
								>
									<Img
										src={img}
										style={{maxHeight: '50%', borderRadius: '5%'}}
										width="auto"
									></Img>
								</AbsoluteFill>
								<AbsoluteFill
									style={{
										top: '60%',
										textAlign: 'center',
										fontSize: '3.5em',
										color: selectedColor,
										fontFamily: 'Obelix Pro Italic',
									}}
								>
									<h1>
										{idx + 1} / {data.images.length}
									</h1>
								</AbsoluteFill>
							</Series.Sequence>
						);
					})}
				</Series>

				<AbsoluteFill>
					<VideoProgress
						duration={videoConfig.durationInFrames}
						color={selectedColor}
					/>
				</AbsoluteFill>
			</AbsoluteFill>

			<AbsoluteFill>
				<Sequence
					from={
						videoConfig.fps * Math.round(data.alignment_prompt.duration + 12)
					}
				>
					<Audio src={staticFile('joke.wav')} />
					<Series>
						{data.alignment_joke.alignment.words.map((word, idx) => {
							return (
								<Series.Sequence
									key={`text-${idx}`}
									durationInFrames={Math.round(
										videoConfig.fps * (word.end_time - word.start_time)
									)}
								>
									{data.unsplash_images_joke.hasOwnProperty(word.word) ? (
										<AbsoluteFill
											style={{
												top: '20%',
												display: 'flex',
												alignContent: 'center',
												justifyItems: 'center',
												justifyContent: 'center',
												flexDirection: 'row',
											}}
										>
											<Img
												src={
													data.unsplash_images_joke[
														word.word as keyof typeof data.unsplash_images_joke
													]
												}
												style={{maxHeight: '20%', borderRadius: '5%'}}
												width="auto"
											></Img>
										</AbsoluteFill>
									) : null}
									<AbsoluteFill
										style={{
											top: '45%',
											textAlign: 'center',
											fontSize: '3.5em',
											color: selectedColor,
											fontFamily: 'Obelix Pro Italic',
										}}
									>
										<h1>{word.word}</h1>
									</AbsoluteFill>
								</Series.Sequence>
							);
						})}
					</Series>
				</Sequence>
			</AbsoluteFill>
		</>
	);
};
