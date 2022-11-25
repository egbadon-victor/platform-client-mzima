import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryInterface, PostResult } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalService, MediaService } from '@services';
import { CollectionsModalComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnChanges {
  @Input() post?: PostResult;
  @Input() feedView: boolean;
  @Input() userId?: number | string;
  @Input() color?: string;
  @Input() twitterId?: string;
  public media?: any;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    private confirmModalService: ConfirmModalService,
    private mediaService: MediaService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      if (changes['post'].currentValue?.post_content?.length) {
        const mediaField = changes['post'].currentValue.post_content[0].fields.find(
          (field: any) => field.type === 'media',
        );
        if (mediaField && mediaField.value?.value) {
          this.mediaService.getById(mediaField.value.value).subscribe({
            next: (media) => {
              this.media = media;
            },
          });
        }
      }
    }
  }

  public isParentCategory(
    categories: CategoryInterface[] | undefined,
    category_id: number,
  ): boolean {
    return !!categories?.find((category: CategoryInterface) => category.parent_id === category_id);
  }

  public addToCollection(): void {
    this.dialog.open(CollectionsModalComponent, {
      width: '100%',
      maxWidth: 480,
      height: 'auto',
      maxHeight: '90vh',
      data: {
        title: this.translate.instant('app.edit_collection'),
      },
    });
  }

  public async deletePost(): Promise<void> {
    const confirmed = await this.confirmModalService.open({
      title: this.translate.instant('notify.post.destroy_confirm'),
      description: this.translate.instant('notify.default.proceed_warning'),
    });
    if (!confirmed) return;
    console.log('FIXME: delete post');
  }
}