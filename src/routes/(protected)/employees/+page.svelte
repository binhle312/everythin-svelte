<script lang="ts">
  import { page } from '$app/state'
  import Avatar from '$lib/components/Avatar.svelte'

  const users = page.data.users || []
</script>

<div class="row">
  <div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th> No. </th>
              <th> User </th>
              <th> Email </th>
              <th> Fullname </th>
              <th class="action"> Status </th>
              <th class="action"> Actions </th>
            </tr>
          </thead>
          <tbody>
            {#each users as user, index}
              <tr class={user.status === 'active' ? 'active' : 'inactive'}>
                <td> {index + 1} </td>
                <td class="py-1"> <Avatar fullName={user.fullName} size={40} /> </td>
                <td> {user.email} </td>
                <td> {user.fullName} </td>
                <td class="action">
                  <span class="badge badge-{user.status === 'active' ? 'success' : 'secondary'}" style="text-transform: capitalize; width: 100%;">
                    {user.status}
                  </span>
                </td>
                <td class="action">
                  <a href='/employee/{user.id}'><i class="fa fa-external-link" data-toggle="tooltip" data-placement="top" title="Detail"></i></a>
                  {#if user.id === page.data.user.id}
                    <!-- Logged user can't lock themselve -->
                  {:else if user.status === 'active'}
                    <i class="fa fa-unlock" data-toggle="tooltip" data-placement="top" title="Lock"></i>
                  {:else}
                    <i class="fa fa-lock" data-toggle="tooltip" data-placement="top" title="Unlock"></i>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<style>
  table .action {
    width: 100px;
    text-align: center;
    vertical-align: middle;
  }

  table tr.active td {
    color: #3e4b5b;
  }

  table tr.inactive td {
    color: #c3bdbd;
  }

  table td .fa {
    margin-right: 10px;
    font-size: 1.2em;
    cursor: pointer;
    color: #da8cff;
  }

  table td .fa:hover {
    color: #b66dff;
  }
</style>