<div class="item">
	<h2>
		<span>
			<#if (Text25766793.getData())??>
				${Text25766793.getData()}
			</#if>		
		</span>
	<#if (Text76665709.getData())??>
		${Text76665709.getData()}
	</#if>
	</h2>
	<#if (Image33093998.getData())?? && Image33093998.getData() != "">
		<img alt="${Image33093998.getAttribute("alt")}" data-fileentryid="${Image33093998.getAttribute("fileEntryId")}" src="${Image33093998.getData()}" />
	</#if>
	<div>
		<#if (RichText75622738.getData())??>
			${RichText75622738.getData()}
		</#if>
	</div>
</div>