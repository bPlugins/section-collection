import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';

import { produce } from 'immer';
import { tabController } from '../../Components/utils/functions';

import Layout from './Wrapper';
import Style from './Style';
import Settings from './Settings';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);

	const updateObject = (obj, key, val, otherKey = null) => {
		const newObj = produce(attributes[obj], draft => {
			if (null !== otherKey) {
				draft[key][otherKey] = val;
			} else {
				draft[key] = val;
			}
		});
		setAttributes({ [obj]: newObj });
	}

	const { content } = attributes;
	const { title, subTitle, btnOneText, btnTwoText, img } = content;

	const titleArea = <RichText tagName="h2" className='title' value={title} onChange={(val) => updateObject('content', 'title', val)} allowedFormats={['core/bold', 'core/italic']} placeholder={__('Enter your title', 'section-collection')} inlineToolbar />

	const subTitleArea = <RichText tagName="h4" className='subTitle' value={subTitle} onChange={(val) => updateObject('content', 'subTitle', val)} allowedFormats={['core/bold', 'core/italic']} placeholder={__('Enter your sub title', 'section-collection')} inlineToolbar />

	const btnOneTextArea = <RichText tagName="a" className='btn' value={btnOneText} onChange={(val) => updateObject('content', 'btnOneText', val)} allowedFormats={['core/bold', 'core/italic', 'core/link']} placeholder={__('Enter your text', 'section-collection')} inlineToolbar />

	const btnTwoTextArea = <RichText tagName="a" className='btn' value={btnTwoText} onChange={(val) => updateObject('content', 'btnTwoText', val)} allowedFormats={['core/bold', 'core/italic', 'core/link']} placeholder={__('Enter your text', 'section-collection')} inlineToolbar />

	const imgArea = <div className="imgArea">
		<div className="uploadArea">

			<div className='upload'><MediaUploadCheck>
				<MediaUpload allowedTypes={['image']} value={img} onSelect={({ id, url, alt, title }) => setAttributes({ content: { ...content, img: { id: id, url: url, alt: alt, title: title } } })} render={({ open }) => <ToolbarButton label="upload" onClick={open} />} />
			</MediaUploadCheck>
			</div>
		</div>
		<div className="img">
			<img src={img.url} alt="" />
		</div>
	</div>

	const itemsProps = {
		titleArea,
		subTitleArea,
		btnOneTextArea,
		btnTwoTextArea,
		imgArea
	}

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} updateObject={updateObject} />

		<div className={className} id={`bpsc-${clientId}`}>
			<Style attributes={attributes} id={`bpsc-${clientId}`} />

			<div className={`bpscSectionCollection`}>
				<Layout attributes={attributes} {...itemsProps} />

			</div>
		</div>
	</>;
};
export default Edit;


