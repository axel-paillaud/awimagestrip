{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 *}

{if $awimagestrip.slides}
  <div class="awimagestrip-container">
    <div class="awimagestrip-grid">
      {foreach from=$awimagestrip.slides item=slide}
        <div class="awimagestrip-slide">
          {if !empty($slide.url)}<a href="{$slide.url}" class="awimagestrip-link">{/if}
            <img src="{$slide.image_url}" alt="{$slide.legend|escape}" class="awimagestrip-image" width="640" height="853" loading="lazy" />
            {if $slide.title}
              <div class="awimagestrip-title-box">
                <h3 class="awimagestrip-title">{$slide.title}</h3>
              </div>
            {/if}
            {if $slide.description}
              <div class="awimagestrip-description-box">
                <div class="awimagestrip-description">{$slide.description nofilter}</div>
              </div>
            {/if}
          {if !empty($slide.url)}</a>{/if}
        </div>
      {/foreach}
    </div>
  </div>
{/if}
